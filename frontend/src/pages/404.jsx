import imgUrl from '../assets/images/page-not-found-404.jpg';

const PageNotFound = () => (
  <div>
    <img alt='Страница не найдена' src={imgUrl}/>
    <h1>Страница не найдена</h1>
    <p>но вы можете перейти на главную страницу</p>
  </div>
);

export default PageNotFound;