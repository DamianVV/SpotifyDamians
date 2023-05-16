import { useRef } from "react";

interface IFileUpload {
    setFile: Function
    accept: string
    children: JSX.Element
}

const FileUpload: React.FC<IFileUpload> = ({ setFile, accept, children }) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e!.target!.files![0])
    }

    const ref = useRef<HTMLInputElement | null>(null)
    return (
        <div onClick={() => ref?.current?.click()}>
            <input type="file" accept={accept} style={{ display: 'none' }} ref={ref} onChange={onChange} />
            {children}
        </div>
    )
}
export default FileUpload