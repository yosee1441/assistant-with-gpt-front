import classnames from 'classnames'

import './TypingLoader.css'

interface TypingLoaderProps {
  className?: string
}

export const TypingLoader: React.FC<TypingLoaderProps> = ({ className }) => {
  return (
    <div className={classnames(className, 'typing')}>
      <span className="circle scaping"></span>
      <span className="circle scaping"></span>
      <span className="circle scaping"></span>
    </div>
  )
}
