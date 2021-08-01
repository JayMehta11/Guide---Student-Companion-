import HashLoader from 'react-spinners/HashLoader'

export default function GlobalLoader() {
    return (
        <div className="position-fixed top-0 left-0 d-flex justify-content-center align-items-center global-loader">
            <HashLoader size={60} color="#36D7B7" />
        </div>
    )
}
