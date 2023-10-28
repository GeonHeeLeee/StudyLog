import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};
export default function ModalPortal({ children }: Props) {
  const portalElem = document.querySelector('#modal')!;
  return createPortal(children, portalElem);
}
