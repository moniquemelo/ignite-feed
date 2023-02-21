import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

export function Comment({ content, onDeleteComment }){
  //Sempre que eu for atualizar alguma informação que depende do valor que ela tinha anteriormente, usar função.
  const [likeCount, setLikeCount] = useState(0)

  function handleLikeComment() {
    //setLikeCount(likeCount + 1)
    setLikeCount(state => {
      return state + 1
    })
  }
  //Pra deletar, eu poderia tentar acessar o state 'const [comments, setComments]' definido lá no
  //componente de Posts, no entanto, eu não tenho acesso. Para eu comunicar esses componentes, eu posso
  //criar uma função e passa-la como uma propriedade. Foi criada a deleteComment para isso.
  function handleDeleteComment(){
    onDeleteComment(content)
  }


  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/71858557?v=4/" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Monique Melo</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp/>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}