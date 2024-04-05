import youtubeService from '../services/youtube';

export async function getServerSideProps() {
  const playlistId = 'PLLkh4DKVHXQ8qs1gMmj3ZAU0VcwUXzfGd';
  const response: any = youtubeService.playlistItems.list({
    // part: 'snippet',
    maxResults: 50, // Set the number of videos you want to retrieve
    playlistId,
  });

  const playlistItems = response.data.items;

  return {
    props: { playlistItems },
  };
}
const YoutubePlayer = ({ playlistItems }: any) => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {playlistItems.map((item: any) => (
          <div key={item.id} className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
              title={item.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    );
  };
  
  export default YoutubePlayer;
