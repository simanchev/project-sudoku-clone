// row/column/block arrays of indexes for a puzzle string

const arrIndexRow = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53],
  [54, 55, 56, 57, 58, 59, 60, 61, 62],
  [63, 64, 65, 66, 67, 68, 69, 70, 71],
  [72, 73, 74, 75, 76, 77, 78, 79, 80],
];

const arrIndexCol = [
  [0, 9, 18, 27, 36, 45, 54, 63, 72],
  [1, 10, 19, 28, 37, 46, 55, 64, 73],
  [2, 11, 20, 29, 38, 47, 56, 65, 74],
  [3, 12, 21, 30, 39, 48, 57, 66, 75],
  [4, 13, 22, 31, 40, 49, 58, 67, 76],
  [5, 14, 23, 32, 41, 50, 59, 68, 77],
  [6, 15, 24, 33, 42, 51, 60, 69, 78],
  [7, 16, 25, 34, 43, 52, 61, 70, 79],
  [8, 17, 26, 35, 44, 53, 62, 71, 80],
];

const arrIndexBlock = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];


// function for spreading a puzzle string into row/column/block arrays depending on element indexes

function getNumArr(str, arr) {
  const arrInd = arr.reduce((prevArr, curArr) => prevArr.concat(curArr));
  const arrNum = new Array(81).fill(null);
  
  for (let i = 0; i < arrInd.length; i++) {
    arrNum[i] = str[arrInd[i]]
  }

  for (let i = 0; i < 81; i += 9) {
    arrNum.push(arrNum.slice(0, 9));
    arrNum.splice(0,9);
  }

  return arrNum;
}

// function for creating an array with all string elements and their environment (row, column, block)

function getNumsEnvironment(str) {
  const arrInds = [arrIndexRow, arrIndexCol, arrIndexBlock]
  const arrNums = arrInds.map(el => getNumArr(str, el))
  const numsEnvirArr = [];

  for (let i = 0; i < 81; i++) {
    numsEnvirArr.push(new Array('index: ' + i))
    numsEnvirArr[i].push(str[i])
    
    arrNums.forEach((el, index) => {
      for (let j = 0; j < 9; j++) {
        if (arrInds[index][j].includes(i)) numsEnvirArr[i].push(el[j])
      }
    })
  }

  return numsEnvirArr
}


// function for findning all unique numbers already presented in element's environment

function getUniqNumsEnvir(arr) {
  for (let i = 0; i < 81; i++) {
    const numsEnvir = arr[i][2].concat(arr[i][3]).concat(arr[i][4])
    const uniqNumsEnvir = [];

    numsEnvir.map(el => {
      if (!uniqNumsEnvir.includes(el) && el !== '-' ) uniqNumsEnvir.push(el)
    })

    arr[i].splice(2)
    arr[i].push(uniqNumsEnvir)
  }

  return arr
}

// function for findning all unique numbers missing in element's environment
function getMissingNumsEnvir(arr) {
  const puzNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let uniqMissingNums = [];
  
  arr.forEach(el => {
      for (let i = 0; i < puzNums.length; i++) {
        if (!el[2].includes(puzNums[i])) uniqMissingNums.push(puzNums[i]);
      }
    el.push(uniqMissingNums)
    uniqMissingNums = [];
  })

  return arr;
}



/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) {

  missingNumsQnt = boardString.split('').filter(el => el === '-').length;

  for (let i = 0; i < missingNumsQnt; i++) {

    const numsEnvir = getNumsEnvironment(boardString)
    const uniqNumsEnvir = getUniqNumsEnvir(numsEnvir)
    const arr = getMissingNumsEnvir(uniqNumsEnvir)

    for (let j = 0; j < 81; j++) {
      if (
        arr[j][3].length === 1 && 
        arr[j][3] !== [] && 
        arr[j][1] === '-'
        ) arr[j][1] = arr[j][3][0]
    }

    boardString = '';
    arr.map(el => boardString += el[1]);
  }

  console.log(boardString)
  return boardString;

}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {

}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {

}


// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
