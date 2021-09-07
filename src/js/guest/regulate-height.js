const leftAdvantages = document.querySelector('.left_list.advantages_list');
const rightAdvantages = document.querySelector('.right_list.advantages_list');

const firstLine = [leftAdvantages.children[0], rightAdvantages.children[0]];
const secondLine = [leftAdvantages.children[1], rightAdvantages.children[1]];

function makeEqualHeight(arr) {
  const heightsList = arr.map((el) => getComputedStyle(el).height);
  if (heightsList[0] === heightsList[1]) return;
  if (heightsList[0] >= heightsList[1]) arr[1].style.height = heightsList[0];
  else if (heightsList[0] <= heightsList[1])
    arr[0].style.height = heightsList[1];
}

makeEqualHeight(firstLine);
makeEqualHeight(secondLine);
