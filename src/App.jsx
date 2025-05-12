
/*
*📌 Milestone 1: Mostrare la lista dei prodotti
1. Parti dall'array products fornito:
const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];
Crea un componente che mostra la lista dei prodotti.
Per ogni prodotto, mostra:
- Nome
- Prezzo

Obiettivo: Vedere un elenco leggibile di tutti i prodotti con nome e prezzo.

*📌 Milestone 2: Aggiungere prodotti al carrello
Aggiungi uno stato locale addedProducts (inizialmente un array vuoto) per rappresentare i prodotti nel carrello.
Per ogni prodotto della lista, aggiungi un bottone "Aggiungi al carrello":
Al click del bottone, usa una funzione addToCart per:
- Aggiungere il prodotto al carrello se non è già presente, con una proprietà quantity = 1.
- Se il prodotto è già nel carrello, ignora l'azione.
Sotto alla lista dei prodotti, mostra una lista dei prodotti nel carrello se addedProducts contiene almeno un elemento.
Per ogni prodotto nel carrello, mostra:
- Nome
- Prezzo
- Quantità

Obiettivo: L'utente può aggiungere prodotti al carrello e vedere una lista dei prodotti aggiunti.

*📌 Milestone 3: Modificare il carrello
Al click successivo del bottone "Aggiungi al carrello", se il prodotto è già presente:
- Usa una funzione updateProductQuantity per incrementare la proprietà quantity del prodotto esistente.
Per ogni prodotto nel carrello, aggiungi un bottone "Rimuovi dal carrello":
- Al click, usa una funzione removeFromCart per rimuovere il prodotto dal carrello.
Sotto alla lista del carrello, mostra il totale da pagare:
- Calcola il totale moltiplicando il prezzo per la quantità di ogni prodotto e somma tutti i risultati.

Obiettivo: Gestire l'aggiunta, la rimozione e il calcolo del totale del carrello in modo dinamico.

*🎯 Bonus 1: Modifica dinamica delle quantità
Al posto di mostrare solo il numero quantity, usa un input di tipo number:
- Quando l'utente modifica il valore dell'input, usa la funzione updateProductQuantity per aggiornare la quantità del prodotto.
Migliora la funzione updateProductQuantity per gestire:
- Numeri decimali: Forza la quantità a essere un numero intero.
- Valori inferiori a 1: Non permettere quantità negative o pari a zero.

Obiettivo: Consentire una modifica precisa e dinamica delle quantità direttamente nel carrello.

*🎯 Bonus 2: Usare useReducer per gestire lo stato del carrello
Sostituisci useState con useReducer per gestire lo stato del carrello.

Configura il reducer con queste azioni:
- ADD_ITEM: Aggiunge un nuovo articolo al carrello con quantity = 1.
- REMOVE_ITEM: Rimuove un articolo specifico dal carrello.
- UPDATE_QUANTITY: Modifica la quantità di un articolo esistente nel carrello, assicurandoti di gestire i casi limite (es. valori negativi).

La struttura del reducer potrebbe essere:

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Logica per aggiungere un prodotto
      break;
    case 'REMOVE_ITEM':
      // Logica per rimuovere un prodotto
      break;
    case 'UPDATE_QUANTITY':
      // Logica per aggiornare la quantità
      break;
    default:
      return state;
  }
}

Obiettivo: Migliorare la struttura del codice utilizzando un approccio più scalabile e organizzato.
*/

import { useState } from 'react'
import './App.css'

//Array Iniziale
const products = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

function App() {
  const [addedProducts, setAddedProducts] = useState([])

  //ADD
  const addToCart = (prodotto) => {
    // const isProductHere = addedProducts.some(p => p.name === prodotto.name); //questo booleano diventa un FIND per 
    const findAddedProduct = addedProducts.find(p => p.name === prodotto.name);

    if (findAddedProduct) {
      updateProductQuantity(findAddedProduct.name, findAddedProduct.quantity + 1)
      return; // blocca la funzione se il prodotto è già presente(ricordi il .some()? )
    }

    //? lo si puo inserire direttamente come nuovo prodotto nel setProducts
    // const newProduct = {
    //   ...prodotto,
    //   quantity: 1
    // }

    setAddedProducts(curr => [...curr, {
      ...prodotto,
      quantity: 1
    }])
  }

  //UPDATE
  const updateProductQuantity = (nome, quantità) => {

    //* mi aspetto che setAddedProducts rispetto al suo stato corrente, 
    //* ritorni un map (perche oltre che aggiornare la quantità del prodotto per 
    //* cui clicco dovrà ANCHE ridarmi i prodotti non modificati)
    //* dove SOLO SE il nome che cerco coincide ALLORA mi cambia la quantità
    //* ALTRIMENTI ristampa il prodotto invariato che tradotto in ternario fa:

    setAddedProducts(curr => curr.map(p => p.name === nome ? { ...p, quantity: quantità } : p))

    //versione senza ternario
    // setAddedProducts(curr => curr.map(p => {
    //   if (p.name === nome) {
    //     return {
    //       ...p,
    //       quantity: quantità
    //     }
    //   }
    //   return p

  }

  //REMOVE
  const removeFromCart = prodotto => {
    setAddedProducts(curr => curr.filter(p => p.name !== prodotto.name));

  }

  //TOTALE con i .reduce()
  const total = addedProducts.reduce((acc, product) => {
    return acc + (product.price * product.quantity)
  }, 0)


  return (
    <div className="container">
      <h1>Prodotti</h1>
      <ul>
        {
          products.map((p, i) => (
            <li key={i}>
              <p>
                {p.name} ({p.price.toFixed(2)}€)
                <button onClick={() => addToCart(p)}> Aggiungi al Carrello</button>

              </p>

            </li>
          ))}
      </ul>

      <ul>
        {
          addedProducts.length > 0 && (<>
            <h3>Nuovo Carrello</h3>
            <ul>
              {addedProducts.map((p, i) => (
                <li key={i}>
                  <p>
                    {p.name} === Prezzo : {p.price} € === Quantità : {p.quantity}
                  </p>
                  <button onClick={() => removeFromCart(p)}> Rimuovi dal Carrello</button>
                </li>
              ))}
            </ul>

          </>)
        }
      </ul>
      <h3>Totale da Pagare : {total.toFixed(2)}€</h3>
    </div>
  )
}

export default App
