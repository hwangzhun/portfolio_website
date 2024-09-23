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
    title: '5G应急专网部署与优化',
    src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/%E6%95%99%E6%A1%88%E9%85%8D%E5%A5%97-5G%E5%BA%94%E6%80%A5%E4%B8%93%E7%BD%91%E9%83%A8%E7%BD%B2%E4%B8%8E%E4%BC%98%E5%8C%96.mp4'
},
{
    id: 4,
    title: '平安好学',
    src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/%E5%BE%AE%E5%89%A7%E6%83%85-%E5%B9%B3%E5%AE%89%E5%A5%BD%E5%AD%A6.mp4'
},
{
    id: 5,
    title: '口罩工厂',
    src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/%E5%AE%A3%E4%BC%A0%E7%89%87-%E5%8F%A3%E7%BD%A9%E5%B7%A5%E5%8E%82.mp4'
},
{
    id: 6,
    title: '英语面试',
    src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/TVC-%E8%8B%B1%E8%AF%AD%E9%9D%A2%E8%AF%95.mp4'
},
{
    id: 7,
    title: '工具箱',
    src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/%E7%94%B5%E5%95%86-%E5%B7%A5%E5%85%B7%E7%AE%B1.mp4'
},
{
    id: 8,
    title: '工具箱',
    src: 'https://blog-data-1306368489.cos.ap-guangzhou.myqcloud.com/portfolio_video/%E4%B8%AA%E4%BA%BAIP-%E5%8F%A3%E6%92%AD.mp4'
},
];

// 通过事件委托统一处理多个视频的播放逻辑
document.addEventListener('click', function (event) {
    if (event.target.closest('.play-video')) {
        event.preventDefault();  // 阻止默认跳转行为

        const videoId = event.target.closest('.play-video').getAttribute('data-id');
        const video = videos.find(v => v.id == videoId);
        
        if (video) {
            Swal.fire({
                html: `
                  <div class="swal-header">
                    <h2 class="custom-title">${video.title}</h2>
                    <button class="custom-close-button" onclick="Swal.close()">×</button>
                  </div>
                  <div class="swal-custom-content">
                    <video class="responsive-video" controls>
                      <source src="${video.src}" type="video/mp4">
                      您的浏览器不支持 video 标签。
                    </video>
                  </div>`,
                showConfirmButton: false,
                customClass: {
                    popup: 'custom-swal-popup',
                },
                padding: '1em',
            });
        }
    }
});