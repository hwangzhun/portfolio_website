fetch('https://blog.hwangzhun.com/api/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // 在这里处理和展示文章数据
    })
    .catch(error => console.error('Error fetching posts:', error));
  
    const postId = 1; // 替换为你想获取的文章 ID
    fetch(`https://api.halo.run/api/posts/${postId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // 在这里处理和展示文章详细信息
        })
        .catch(error => console.error('Error fetching post:', error));
    
