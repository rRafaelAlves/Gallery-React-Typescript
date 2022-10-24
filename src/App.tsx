import * as C from './App.styles'
import * as Photos from './services/photos'
import './App.css';
import { FormEvent, useEffect, useState } from 'react';
import { Photo } from './types/Photo';
import {PhotoItem} from './components/PhotoItem'


function App() {
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<Array<Photo>>([])


  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)

      let photos = await Photos.getAll()
      setPhotos(photos)
      setLoading(false)
    }

    getPhotos();
  }, [])


const handleFormSubmit =  async (e: FormEvent<HTMLFormElement>) =>{
e.preventDefault();

const formData = new FormData(e.currentTarget);
const file = formData.get('image') as File;

if(file && file.size > 0){
setUploading(true);

let result = await Photos.insert(file);

if(result instanceof Error){
  alert(`${result.name} - ${result.message}`);
}else{
  let newList = [...photos];
  newList.push(result)
  
  setPhotos(newList);
}

setUploading(false)

}else{
alert('Insira um arquivo válido.')

}
}


  return (
    <C.Container>
      <C.Area>
        <C.Header> Galeria de fotos </C.Header>


        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>

          <input type="file" name='image' />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando..."}
        </C.UploadForm>


        {loading &&
          <C.ScreenWarning>
            <div className='emoji'>✋</div>
            <div>Carregando...</div>
          </C.ScreenWarning>}


        {!loading && photos.length > 0 && <C.PhotoList>

          {photos.map((photo, index) => (
            <PhotoItem key={index} url={photo.url} name={photo.name}></PhotoItem>
          ))}

        </C.PhotoList>}


        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className='emoji'>😟</div>
            <div>Não há fotos cadastradas...</div>
          </C.ScreenWarning>}
      </C.Area>
    </C.Container>
  );
}

export default App;
