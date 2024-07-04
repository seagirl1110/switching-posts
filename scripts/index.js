const postsURL = 'https://jsonplaceholder.typicode.com/posts/';
let postCurrentIndex = 1;

const postEl = document.querySelector('.post');
const btnPrev = document.querySelector('.btn--prev');
const btnNext = document.querySelector('.btn--next');

const getPostData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPost = (post) => {
  const title = document.createElement('h3');
  title.textContent = `${post.id}. ${post.title}`;
  const body = document.createElement('p');
  body.textContent = `${post.body}`;
  postEl.append(title, body);
};

const setBtnAction = (pointer) => {
  btnPrev.style.pointerEvents = pointer;
  btnNext.style.pointerEvents = pointer;
  if (postCurrentIndex === 1) {
    btnPrev.style.pointerEvents = 'none';
  }
};

const loadPost = async () => {
  setBtnAction('none');
  postEl.innerHTML = '';
  const postCurrentURL = `${postsURL}${postCurrentIndex}`;
  const postData = await getPostData(postCurrentURL);
  createPost(postData);
  setBtnAction('auto');
};

loadPost();

btnPrev.addEventListener('click', () => {
  postCurrentIndex -= 1;
  loadPost();
});

btnNext.addEventListener('click', () => {
  postCurrentIndex += 1;
  loadPost();
});
