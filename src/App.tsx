import * as C from './App.styles'
import * as Photos from './services/photos'
import './App.css';
import { useEffect, useState } from 'react';
import { Photo } from './types/Photo';
import {PhotoItem} from './components/PhotoItem'


function App() {
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

  return (
    <C.Container>
      <C.Area>
        <C.Header> Galeria de fotos </C.Header>
        { /*  área de upload */}


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
