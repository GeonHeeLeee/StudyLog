import Image from "./Image";
import styles from './ProfileIcon.module.css'

interface Props {
  size: 'small' | 'medium' | 'large';
  src: string;
  alt: string;
}

export default function ProfileIcon({size, src, alt}: Props) {
  return <Image className={`${styles['profile-icon']} ${styles[size]}`} src={src} alt={alt}/>
}