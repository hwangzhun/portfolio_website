// 存储视频信息的数组
const videos = [{
        id: 1,
        title: 'CIOE 2018',
        src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/Highlights%20of%20CIOE%202018.mp4'
    },
    {
        id: 2,
        title: 'CIOE 2019',
        src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/Highlights%20of%20CIOE%202019.mp4'
    },
    {
        id: 3,
        title: '视频3',
        src: 'video3.mp4'
    }
];

// 通过事件委托统一处理多个视频的播放逻辑
document.addEventListener('click', function(event) {
    if (event.target.closest('.play-video')) {
        event.preventDefault();  // 阻止默认跳转行为
        
        const videoId = event.target.closest('.play-video').getAttribute('data-id');
        const video = videos.find(v => v.id == videoId);

        if (video) {
            Swal.fire({
                title: video.title,
                html: `<video width=“100%” height=“100%” controls autoplay>
                        <source src="${video.src}" type="video/mp4">
                        您的浏览器不支持 video 标签。
                       </video>`,
                showCloseButton: true,
                showConfirmButton: false,
                width: '50%' ,
                padding: '0.5em',
                customClass: {
                    popup: 'custom-swal-popup',
                }
            });
        }
    }
});