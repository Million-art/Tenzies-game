import React from "react"
import Die from "./Die"
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"
export default function App() {
  const [diece,setDiece]=React.useState(allNewDice())
  const [tenzies, setTenzies]=React.useState(false)
   
React.useEffect(()=>{
      const allHeld=diece.every(die=>die.isHeld)
      const fristValue=diece[0].value
      
      const allSameValue=diece.every(die=>
        die.value===fristValue)
      if(allHeld && allSameValue){
          setTenzies(true)
        }
  },[diece])


function generateNewDie(){
  return ({
    id:nanoid(),
    value:Math.ceil(Math.random()*6),
    isHeld:false
  })
}
  

function allNewDice(){
    const newDice=[]
    for(let i=0; i<10; i++){
       newDice.push(generateNewDie())
    }
    return newDice;
  }
  
  
function holdDice(id){
        setDiece(oldDice=>oldDice.map(die=>{
            return die.id === id ? {...die, isHeld:!die.isHeld}: die


        }))
}
      
  
  const diceElements=diece.map(die=>
    <Die
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld}  
        holdDice={()=>holdDice(die.id)}
      />
  )
  
  
function rollDice() {
    if(!tenzies) {
        setDiece(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    } else {
        setTenzies(false)
        setDiece(allNewDice)
    }
}
 
return (
  <main>
      {tenzies && <Confetti />}
      
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies?'New Game':'Roll'}</button>
  </main>
    )
}