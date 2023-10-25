import imgUrl from '../assets/images/page-not-found-404.jpg';

const PageNotFound = () => (
  <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">

    <img className="max-w-sm" alt="Страница не найдена" src={imgUrl} />
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Страница не найдена</h1>
    <p className="mt-6 text-base leading-7 text-gray-600">Извините, мы не смогли найти страницу, которую вы ищете</p>
    <a href="/" className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm my-6 font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Перейти на главную страницу</a>
  </main>
);

export default PageNotFound;
