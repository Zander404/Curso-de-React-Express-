//React
import react, { useState, useEffect } from 'react';


import * as Dialog from '@radix-ui/react-dialog';


//Componentes 
import { GameBanner } from './components/GamerBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { Input } from './components/Input';


// Propriedades & Style
import "/styles/main.css";
import { GameController } from 'phosphor-react';

//Logo 
import logoSvg from "./assets/logo.svg";

interface Game {
   id: string;
   title: string;
   bannerUrl: string;
   _count: {
      ads: number;
   }

}


function App() {
   //Usando State do React
   const [games, setGames] = useState<Game[]>([])

   useEffect(()=>{
      fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
         setGames(data)
      })
   }, [])



   return (
      <div className="max-w-[1344px] flex flex-col mx-auto items-center my-20 ">
         <img src={logoSvg} alt="Logo" />
         <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">Duo</span> está aqui. </h1>


         {/* Div de Jogos */}
         <div className="grid grid-cols-6 gap-6 mt-16">
            {games.map(game =>{
               return (
                  <GameBanner
                  key={game.id}
                  title= {game.title} 
                  bannerUrl = {game.bannerUrl}
                  adsCount = {game._count.ads}

                  />
               )
            })}
           <GameBanner
            title= 'League of Cachorro'
            bannerUrl ='https://static-cdn.jtvnw.net/ttv-boxart/62760102_IGDB-285x380.jpg'
            adsCount = {5}
            />
         </div>
         {/* Fim da Div de Jogos */}




         {/* Div da Caixa de Ajuda */}
         <Dialog.Root>
            <CreateAdBanner />

            <Dialog.Portal>
               <Dialog.Overlay  className='bg-black/60 inset-0 fixed'/>
               <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounder-lg w-[480px] shadow-lg shadow-black'>
                  <Dialog.Title className='text-3xl font-black'>Publique um anuncio aqui</Dialog.Title>

                  <form className='mt-8 flex flex-col gap-4'>


                     <div className='flex flex-col gap-2'>
                        <label className='font-semibold' htmlFor="game">Qual o game?</label>
                        <Input id='game' placeholder="Selecione o game que deseja jogar" /> 
                     </div>


                     <div className='grid grid-col gap-2'>
                        <label className='font-semibold' htmlFor="name">Seu nome (ou nickname)</label>
                        <Input id='name' type="text" placeholder='Como te chamam no game?'/>
                     </div>


                     <div className='grid grid-col gap-6'>
                        <div className='flex flex-col gap-2' >
                           <label className='font-semibold' htmlFor='yearsPlaying'>Joga a quantos anos?</label>
                           <Input id="yearsPlaying" type="number" placeholder="Se for ZERO é Noob '-'" />
                        </div>


                        <div className='flex flex-col gap-2'>
                           <label className='font-semibold' htmlFor='discord'>Qual seu Discord?</label>
                           <Input id='discord' type="text" placeholder='Usuário#0000' />
                        </div> 

                     
                        <div className='flex gap-6'>
                           <div className='flex flex-col gap-2 flex-1' >
                              <label className='font-semibold' htmlFor='weekDays'>Quando costuma jogar?</label>
                              <div>
                                 <button className="w-8 h-8 rounded bg-zinc-900 " title="Domingo">D</button>
                                 <button className="w-8 h-8 rounded bg-zinc-900 " title="Segunda">S</button>
                                 <button className="w-8 h-8 rounded bg-zinc-900 " title="Terça">T</button>
                                 <button className="w-8 h-8 rounded bg-zinc-900 " title="Quarta">Q</button>
                                 <button className="w-8 h-8 rounded bg-zinc-900 " title="Quinta">Q</button>
                                 <button className="w-8 h-8 rounded bg-zinc-900 " title="Sexta">S</button>
                                 <button className="w-8 h-8 rounded bg-zinc-900 " title="Sabado">S</button>
                              </div>

                           </div>
                           <div className='flex flex-col gap-2 flex-1' >
                              <label className='font-semibold' htmlFor='hourStart'>Qual o horário do dia?</label>
                        

                              <div className='grid grid-col gap-2'>
                                 <Input id='hourStart' type='time' placeholder="De" />
                                 <Input id='hourEnd' type="time" placeholder="Até" />
                              </div>
                           </div>
                        </div>
                     
                        <div>
                           <input type="checkbox" />
                           Costumo me conectar ao chat de voz
                        </div>
                     </div>
                     <footer>
                        <button>Cancelar</button>
                        <button type='submit'>
                           <GameController />
                        </button>
                     </footer>
                  </form>
                 
               </Dialog.Content>
            </Dialog.Portal>
         </Dialog.Root>
         {/* Fim da Caix de Ajuda */}
         
      </div>
   );
}

export default App
