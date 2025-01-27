import { useState } from 'react';
import SFilePicker from '../components/SFilePicker';

const FilePicker = () => {
 const [file, setFile] = useState<File | FileList | null>(null);
 return (
  <div className='flex flex-col gap-y-12pxr'>
   multiple
   <SFilePicker
    onChange={setFile}
    multiple
   />
   single
   <SFilePicker
    fileClassName='!w-100pxr'
    onChange={setFile}
    placeholder='Select a file'
   />
   disable
   <SFilePicker
    disable
    onChange={setFile}
   />
   disable + label
   <SFilePicker
    label='label'
    disable
    onChange={setFile}
   />
  </div>
 );
};

export default FilePicker;
