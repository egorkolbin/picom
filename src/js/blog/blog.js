import '../../css/blog-page/blog-main.css';
import { articles } from './articles.js';

const articlesList = document.querySelector('ul.blog_grid');
const loadButton = document.querySelector('.more_button');
const onPage = 3;

// const test = document.createElement('img');
// test.src = '../../images/blog1.png';
// articlesList.append(test);

function templateArticle(article, index) {
  const articleNum = index + 1;
  const listItem = document.createElement('li');
  listItem.classList.add('blog_item', 'blog_block', 'blog_item-${articleNum}');
  listItem.innerHTML = `
  <p class="card_info_view">
    <span class="number">${article.views}</span>
  </p>
  <p class="card_info_time">
    <span class="number">${article.time}</span> мин.
  </p>
  <p class="blog_text card_text">
   ${article.text}
  </p>
  <a href="blog1.html" class="blog_button button white_button"
    >Читать статью</a
  >`;
  listItem.style.background = `url(../../images/blog${articleNum}.png)`;
  return listItem;
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
  let currentArticlesNum = articlesList.querySelectorAll('li').length;

  articlesForDisplay.forEach((article, articleIndex) => {
    const realArticleIndex = articleIndex + currentArticlesNum;
    const newArticle = templateArticle(article, realArticleIndex);

    articlesList.appendChild(newArticle);
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
