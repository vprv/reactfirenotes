import React, {useEffect, useState, useCallback, useContext} from "react";

import Notes from "../components/Notes";
import Files from "../components/Files";
import {auth, functions, storage} from "../firebase";
import {UserContext} from "../providers/UserProvider";
const storageRef = storage.ref();

const placeholderImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgT9kbszqM7fbnqU1Mh_klw_4tGznX9KrExN9A_EaOrIVnYBv0&usqp=CAU';

const ProfilePage = () => {
  const [user, setUser] = useState({
    photoURL: null,
    displayName: null,
    email: null,
    createdAt: null
  });
  const [form, setForm] = useState({});
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [files, setFiles] = useState([]);

  const userAuth = useContext(UserContext);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const changeNoteHandler = event => {
    setNote(event.target.value)
  }

  const sendFile = async ({path, url}) => {
    const sendFile = functions.httpsCallable('sendFile');
    const response = await sendFile({path, url});
    console.log(`response from sendFile function ${response}`);
  }

  const uploadFile = async (file = null) => {
    if(!file) {
      throw new Error(`File doesn't exist`);
    }
    const path = `files/${userAuth.uid}/${Date.now()}_${file.name}`;
    await storageRef.child(path).put(file);
    return path;
  }
  const getFileUrlByPath = async (path = '') => {
    if(!path) {
      throw new Error("Invalid file path");
    }
    const url = storageRef.child(path).getDownloadURL();
    return url;
  }

  const fileOnChangeHandler = async (event) => {
    event.preventDefault();
    let file = event.target.files[0];

    const path = await uploadFile(file);
    const url = await getFileUrlByPath(path);
    await sendFile({path, url});
  }

  const getUser = useCallback( async () => {
    const getUser = functions.httpsCallable('getUser');
    const userData = await getUser();
    const user = userData.data.user;
    return user;
  }, [setUser]);

  const changeUserProfile = async (data) => {
    const changeUserProfile = functions.httpsCallable('changeUserProfile');
    const response = await changeUserProfile(data);
    console.log('response',response);
  }

  const addNote = async (data) => {
    const addNote = functions.httpsCallable('addNote');
    const response = await addNote(data);
    setNote('');
  }

  const getNotes = useCallback( async () => {
    const getNotes = functions.httpsCallable('getNotes');
    const userData = await getNotes();
    const notes = userData.data;
    console.log('notes', notes);
    return notes;
  }, [setNotes]);

  const getFiles = useCallback( async () => {
    const getFiles = functions.httpsCallable('getFiles');
    const userData = await getFiles();
    const files = userData.data;
    console.log('files', files);
    return files;
  }, [setFiles]);

  useEffect(() => {
    getUser().then(user => {
      setUser({...user, user});
      console.log(user);
    });

    getNotes().then((notes) => {
      setNotes(notes);
    });

    getFiles().then((files) => {
      setFiles(files);
      console.log('files', files)
    });

  }, [getUser, getNotes, getFiles]);

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <ul>
            <li><a href="#" className="brand-logo">{user.email}</a></li>
          </ul>
          <ul className="right">
            <li><a className="waves-effect waves-light btn" onClick={() => {auth.signOut()}}>Sign out</a></li>
          </ul>
        </div>
      </nav>
      <div>
        <h3>Данные пользователя</h3>
        <div>
          <img style={{height: 200}}
               src={user.photoURL || placeholderImg}
               alt=""/>
          <div style={{display: 'flex'}}>
            <span>Имя</span>
            <input type="text" name="displayName" defaultValue={user.displayName} onChange={changeHandler}/>
            <a className="waves-effect waves-light btn" onClick={() => {changeUserProfile(form)}}>Сменить данные</a>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>Файлы</h3>
          <Files data={files}/>
        </div>
        <div>
          <h3>Заметки</h3>
          <Notes data={notes}/>
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <input type="text" placeholder="Заметка..." name="note" value={note} onChange={changeNoteHandler}/>
        <a className="waves-effect waves-light btn" onClick={() => {addNote(note)}}>Отправить</a>
      </div>
      <div>
        <form action="#">
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" onChange={fileOnChangeHandler}/>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};
export default ProfilePage;
