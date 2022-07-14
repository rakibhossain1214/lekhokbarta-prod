import React from 'react';

function MyContent() {
    return (
        <div>
            Hello Content!
        </div>
    );
}

export default MyContent;

// export async function getServerSideProps( {params} ){
    
//     const slug1 = params.slug[0];
//     const slug2 = params.slug[1];

//     return {
//         props: { slug1, slug2 },
//         // revalidate: 1
//       }
// }