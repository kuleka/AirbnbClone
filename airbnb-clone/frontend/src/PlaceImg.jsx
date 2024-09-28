export default function PlaceImg ({place, index = 0, className = null}) {
    if (!place.photo?.length) {
        return '';
    }

    if (!className) {
        className = 'object-cover, aspect-square';
    }

    return (
        <img className={className} src={'http://localhost:3000/uploads/' + place.photo[index]} alt='' />
    );
}