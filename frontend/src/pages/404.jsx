import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import imgUrl from '../assets/images/page-not-found-404.jpg';

const PageNotFound = () => (
  <main className="container-fluid d-flex flex-column col-8 align-items-center justify-content-center vh-100">
    <Image className="col-8" alt="Страница не найдена" src={imgUrl} />
    <h1 className="h1">Страница не найдена</h1>
    <p className="lead">Извините, мы не смогли найти страницу, которую вы ищете</p>
    <Link to="/" className="link-underline-primary link-offset-2">Перейти на главную страницу</Link>
  </main>
);

export default PageNotFound;
