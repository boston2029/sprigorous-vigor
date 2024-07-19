/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const portal = "n"
const pushable = "b"

setLegend(
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ player, bitmap`
................
...CCCCCCC......
...CC66666......
...CC66660......
...CC66660......
...CC66666......
...CC66633......
...CC66666......
......66........
....777777......
....776677......
....776677......
....776677......
....444444......
....44..44......
....44..44......` ],
  [pushable, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999999999999999
9999999999999999
9999999999999999`],
  [portal, bitmap`
................
...4444444444...
...4777777774...
..477744447774..
..477444444774..
..477447744774..
..477447744774..
..477447744774..
..477447744774..
..477444444774..
..477444444774..
..447477774744..
...4744774474...
...4774444774...
...4444444444...
................`]
)

setSolids([player, wall, pushable])

let level = 0
const levels = [
  map`
wwwwnwwwwww
...........
wwwwwwwwww.
...........
.wwwwwwwwww
...........
wwwwwwwwww.
p..........`,
  map`
nwwwwwwwwww
...........
wwwwwwwwww.
www....www.
ww..ww.....
ww.wwwwwwww
ww....wwwww
wwwwwpwwwww`,
  map`
..........p
w.wwwwwwwww
wbwwwwwwwww
wbwwwwwwwww
..wwwwwwwww
...wwwww...
...wwwww...
..........n`,
  map`
wwwwwwwwwwp
wwwwwwwwwwb
www......bb
wwwwbwwwwwb
ww...wwwww.
ww.n.wwwww.
ww...wwwwww
wwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: [player, pushable],
  [pushable]: [pushable, pushable]
})

addText("where am i?", {
  x: 4,
  y: 14
})

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  const playerTile = getTile(getFirst(player).x, getFirst(player).y)
  const hasReachedPortal = playerTile.some(sprite => sprite.type === portal)
  if (hasReachedPortal) {
    clearText()
    level++
    setMap(levels[level])
    switch (level + 1) {
      case 2:
        addText("need to get out", {
          x: 5,
          y: 3
        })
        break
      case 3:
        addText("i can push these", {
          x: 1,
          y: 1
        })
        break
    }
  }
})
