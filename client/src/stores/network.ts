import { create } from 'zustand';
import { Http } from '../api/networkInterface/api/http';
import { devtools, persist } from 'zustand/middleware';
import { HttpInterface } from '../api/networkInterface/api/httpInterface';

interface INetwork {
  httpInterface: HttpInterface;
}

const useNetwork = create<INetwork>()(
  devtools(
    () => ({
      httpInterface: new HttpInterface(new Http()),
    }),
    { name: 'network' }
  )
);

export default useNetwork;
