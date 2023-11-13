const BLOCKS = {
  //초기모습부터 시계방향으로 90도 회전
  tree: [
    [
      [2, 1],
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 1],
      [1, 0],
    ],

    [
      [2, 1],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 1],
      [1, 0],
    ],
  ],
  square: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  bar: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
  ],
  zee: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [1, 1],
      [1, 2],
    ],
  ],
  elLeft: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2],
    ],
  ],
  elRight: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 2],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
  ],
};

export default BLOCKS;
