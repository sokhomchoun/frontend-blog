export const ProvideToken = () => {
    const tokenProvider = sessionStorage.getItem('token');
    return tokenProvider;
};

export const uIdToken = () => {
    const _uIdProvider = sessionStorage.getItem('_uid');
    return _uIdProvider;
}