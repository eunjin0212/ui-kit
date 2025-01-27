import { ChangeEvent, useState } from 'react';
import { FileIcon20 } from '../assets/FileIcon';
import SInput, { SInputProps } from './SInput';

type FileInput = Omit<SInputProps, 'onChange'>;

export interface SFilePickerProps extends FileInput {
	onChange: (arg: File | FileList | null) => void;
 fileClassName?: string;
}

const SFilePicker = ({
	accept,
	multiple,
	onChange,
	placeholder,
 disable,
 fileClassName,
 label
}: SFilePickerProps) => {
	const [file, setFile] = useState<File | FileList | null>(null);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		onChange(files);
		setFile(files);
	};
	return (
		<SInput
			accept={accept}
			multiple={multiple}
			type='file'
			placeholder={placeholder}
			prepend={<FileIcon20 className='mr-8pxr' />}
			onChange={handleChange}
			inputClassName={['opacity-0 absolute z-10', file !== null && 'absolute z-10'].join(' ')}
   disable={disable}
   label={label}
			append={
				<div className={['truncate w-300pxr overflow-hidden', fileClassName].join(' ')}>
					{file instanceof FileList && file?.length
						? Array.from(file)
								.map((val) => val.name)
								.join(', ')
						: file instanceof File
							? file?.name
							: placeholder}
				</div>
			}
		/>
	);
};

export default SFilePicker;
