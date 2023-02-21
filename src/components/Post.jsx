import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment'
import { Avatar } from './Avatar'

import styles from './Post.module.css'
import { useState } from 'react'

export function Post({author, publishedAt, content}) {

  const [comments, setComments] = useState([
    'Post muito bacana! Parabéns',
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  /* Ação do usuário - handle (submit) */
  function handleCreateNewComment() {
    event.preventDefault()
    /* Eu passo o novo valor (imutabilidade) */
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }
  //target é o elemento que aconteceu aquele evento
  function handleNewCommentChange() {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Esse campo é obrigatório.')
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment != commentToDelete
    })
    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          // Coloca a Key no PRIMEIRO elemento de retorno de um map 
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link'){
            return <p key={line.content}><a href="#" >{line.content}</a></p>
          }
        })}
      </div>

      {/* Comportamento padrão do submit é levar o usuário pra outra página */}
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          name="comment"
          value={newCommentText}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid} //Chamada sempre que o HTML identificar que um texto de um submit é invalido
          required //Como eu quero que por default essa propriedade seja true, eu nao preciso colocar required={true};
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer> 
      </form>

      <div className={styles.commentList}>
        { comments.map(comment => {
          return (
            <Comment 
            key={comment} 
            content={comment} 
            onDeleteComment={deleteComment}
            />
          )
        }) }
      </div>
    </article>

  )
}
