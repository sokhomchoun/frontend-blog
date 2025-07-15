import './style/style.css';

export default function LoadingComponent() {
    return (
        <>
            <div className="loading-container">
                <div className="lds-dual-ring"></div>
                <div className="loading-text">Loading...</div>
            </div>

        </>
    )
}