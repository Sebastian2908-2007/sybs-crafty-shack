/**material UI imports start */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
/**material UI imports end */
/**styled Components imports start */
import { ReviewCardTitle } from '../styles/H2.styled';
import { ReviewCardNameSpan } from '../styles/Spans.styled';
import { ReviewTextParagraph } from '../styles/P.styled';
/**styled Components imports end */
const ReviewCard = ({review}) => {
    /**destructure the review*/
    const {reviewText,author,rating} = review;
    /**destructure author data from destructured review data*/
    const {firstName,lastName} = author;
return (
    <Card sx={{display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    textAlign:'center',
    boxShadow:' 0 0 10px black',
    height:'100%',
    maxWidth: '100%',
    backgroundColor: "rgb(255,255,255,0.6)",
    border: '1px solid black'
    }}>
        <CardContent>
            <ReviewCardTitle>
                <ReviewCardNameSpan>{firstName}</ReviewCardNameSpan>
                <ReviewCardNameSpan>{lastName}</ReviewCardNameSpan>
            </ReviewCardTitle>
<Rating name="read-only" value={rating} sx={{ marginBottom:'2%' }} readOnly/>
        <ReviewTextParagraph>
            {reviewText}
        </ReviewTextParagraph>
        </CardContent>
    </Card>
);
};
export default ReviewCard;