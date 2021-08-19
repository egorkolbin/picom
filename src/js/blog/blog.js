import '../../css/blog-page/blog-main.css';
import { articles } from './articles.js';

const articlesList = document.querySelector('ul.blog_grid');
const loadButton = document.querySelector('.more_button');
const onPage = 3;

function templateArticle(article, index) {
  const articleNum = index + 1;
  return `<li class="blog_item blog_block blog_item-${articleNum}">
  <p class="card_info_view">
    <span class="number">${article.views}</span>
  </p>
  <p class="card_info_time">
    <span class="number">${article.time}</span> мин.
  </p>
  <p class="blog_text card_text">
   ${article.text}
  </p>
  <a href="blog${articleNum}.html" class="blog_button button white_button"
    >Читать статью</a
  >
  </li>`;
}

function renderArticles() {
  let loadNum = +articlesList.dataset.page;
  let articlesToLoad = [];

  const start = loadNum * onPage;

  if (start + onPage >= articles.length) {
    articlesToLoad = articles.slice(start, start + onPage);
    loadButton.style.display = 'none';
  } else articlesToLoad = articles.slice(start, start + 3);

  loadNum++;
  articlesList.dataset.page = loadNum;

  return articlesToLoad;
}

function displayArticles() {
  const articlesForDisplay = renderArticles();
  console.log(articles, articlesForDisplay);
  let currentArticlesNum = articlesList.querySelectorAll('li').length;

  articlesForDisplay.forEach((article, articleIndex) => {
    const realArticleIndex = articleIndex + currentArticlesNum;
    const newArticle = templateArticle(article, realArticleIndex);
    console.log(currentArticlesNum, articleIndex, realArticleIndex);

    articlesList.insertAdjacentHTML('beforeend', newArticle);
    const newArticleEl = articlesList.querySelectorAll('li')[realArticleIndex];

    //Разобраться с URL картинок! Тут костыль
    newArticleEl.style.backgroundImage = `url(https://github.com/An-nett/picom/raw/adaptive/src/images/blog${
      realArticleIndex + 1
    }.png)`;
  });
}

function handleArticles() {
  loadButton.setAttribute('disabled', 'disabled');
  displayArticles();
  loadButton.removeAttribute('disabled');
}

displayArticles();
document.addEventListener('DOMContentLoaded', () => {
  loadButton.addEventListener('click', handleArticles);
});
