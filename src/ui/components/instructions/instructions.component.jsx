import './instructions.style.css'

export const Instructions = ({ playing, togglePlaying }) => {
  return (
    <div className={`instructions-container ${playing ? 'instructions-hidden' : ''}`}>
      <div className='instructions'>
        <h1 className='instructions-title'>BIRTHDAY'S GUITAR HERO</h1>

        <div>
          <p>
            &emsp;&emsp;Mor cabrito, pra comemorar seu aniversário e te inspirar, resolvi fazer este jorjinho
            pra você.
          </p>
          <p></p>
          <p>Te amo!</p>
        </div>

        <button className='instructions-start' onClick={togglePlaying}>
          START
        </button>
      </div>
    </div>
  )
}
