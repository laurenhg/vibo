import React from 'react';
import { useForm } from 'react-hook-form';
import AuthorCard from "../../components/AuthorCard/AuthorCard.jsx";
import Button from "../../components/button/Button.jsx";
import styles from './AuthorPortal.module.css';
import useAuthorData from "./AuthorPortalComponents/UseAuthorData.jsx";

const AuthorPortal = () => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const { authorData, works, loading, error, searchAuthor } = useAuthorData();

    const onSubmit = data => {
        searchAuthor(data.name);
    };

    return (
        <div className={styles.authorPortalContainer}>
            <h2>Author Portal</h2>
            <p>Enter an author's name to learn more about them!</p>
            <form className={styles.authorSearchForm} onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('name')} // This binds the input to useForm
                    className={styles.authorSearchInput}
                    placeholder="Enter author name"
                    disabled={isSubmitting || loading}
                />
                <Button type="submit" disabled={isSubmitting || loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </form>
            {loading && <p className={styles.loadingMessage}>Loading...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {authorData && <AuthorCard author={authorData} works={works} />}
        </div>
    );
};

export default AuthorPortal;