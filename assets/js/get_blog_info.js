document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'pat_eyJraWQiOiJWTEZyYllkNUZmZnZFZU1LOW1RVlVUdm9KSVplX2VHMjhRX05BVWswX1RVIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwOi8vYmxvZy5od2FuZ3podW4uY29tIiwic3ViIjoiaHdhbmd6aHVuIiwiaWF0IjoxNzI3MTA0NDQ3LCJqdGkiOiI5MDJiNmMwYi1mMmY5LTU1MzEtYjA1YS03YTZmMzE5M2JmMGQiLCJwYXRfbmFtZSI6InBhdC1od2FuZ3podW4tb3luRmsifQ.p43Vkktylp4p5BnoxKL6DBl2x7FD4EmycDXqdXPCtgTMnkGZfsNwwGa9XTmUDmVGFD9FV_c2lmcQsL1Hmjd0_VhCM17okF0akj7vnMMQXntYuFObb0XUqFhApPbfsmUBCkFia5qJwl6jTAEwhhmCayvMm5nyJ7nCMiJotr_aFBse0JoZinXzv5_9NXiImNRX5Dxec9fFelTsBjSrLKenFm2t3snJj2X7bOolpe6G-aAZQbDuiEubAe19DYN5dMzUZ35Wt2GovKspCsRy9hi3axFIBP4GiTx5nQbzAqtiaxZeHi746uIsyRlqgnId39k6TyIxnBpLGeuaBYYQkMfEwOe40GlbJrPT1G9GOAdcfna1YiVHTQo3K6-1j5eNppeyTByU0WhN8gxS7tFuu_UdS4h9Mzn62azM_JNQ8VxhadFcE8AE3Cmo_4J1dqUQbzfg0auDOlYId-DcWgyTr_Zqm761G1574XrrZVI4mEHcLJpyv_4M6KYmxnITX0FSA0pBnlv_hwmv3XAtjS3Yx7uatA_rWigmqYHt3G5jM14epAxYjZDZ6P0NuZXZDFPaeqTU5eit3tWX3E2KxC3JFHha1E45oLaAy84elH-p0ByMkpabI5YC9uvpbK0uaxWmJaOjsU3NCK8a7-c1Enqr22wmRSND8-8wmXSMz2VvK6DBJpY'; // 替换为你的 API 密钥
    const apiUrl = 'https://blog.hwangzhun.com/apis/api.content.halo.run/v1alpha1/categories/76514a40-6ef1-4ed9-b58a-e26945bde3ca/posts'; // 替换为你的 API URL
    const targetCategoryUUID = '76514a40-6ef1-4ed9-b58a-e26945bde3ca'; // 目标分类的 UUID
    
    // UUID 到分类名称的映射
    const categoryNames = {
    '76514a40-6ef1-4ed9-b58a-e26945bde3ca': '照片',
    'category-qvZKM': '胶卷',
    'category-QiuXZ': '数码',
    'category-zsvqy': 'CCD'
    };
    
    // 使用 fetch 获取文章数据
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'accept': '*/*'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // 检查返回的数据结构
        const filteredPosts = filterPostsByCategory(data.items); // 过滤文章
        renderPosts(filteredPosts.slice(0, 6)); // 渲染最新的 6 篇文章
    })
    .catch(error => console.error('获取文章时出错:', error));
    
    // 过滤出分类 UUID 匹配的文章
    function filterPostsByCategory(posts) {
        return posts.filter(post => {
            const postCategories = post.spec.categories;
            return postCategories.some(category => category === targetCategoryUUID);
        });
    }
    
    // 渲染文章
    function renderPosts(posts) {
        const postsContainer = document.getElementById('posts');
    
        // 确保 posts 存在并且是一个数组
        if (posts && Array.isArray(posts)) {
        posts.forEach(post => {
            const postSpec = post.spec;
            const postDiv = document.createElement('li');
            postDiv.classList.add('blog-post-item');
    
            // 获取文章的所有分类 UUID，并映射到分类名称
            const categoryUUIDs = postSpec.categories;
            const categoryNamesList = categoryUUIDs
                .map(uuid => categoryNames[uuid] || '未分类') // 使用映射获取名称，找不到则显示 "未分类"
                .join(' - '); // 用 " - " 分隔多个分类名称

            // 获取当前时间并格式化为 YYYY-MM-DD
            const publishDate = new Date(postSpec.publishTime);
            const formattedDate = `${publishDate.getFullYear()}-${String(publishDate.getMonth() + 1).padStart(2, '0')}-${String(publishDate.getDate()).padStart(2, '0')}`;
    
                postDiv.innerHTML = `
                    <a href="#">
    
                        <figure class="blog-banner-box">
                            <img src="${postSpec.cover || './assets/images/default.jpg'}" alt="${postSpec.title}" loading="lazy">
                        </figure>
    
                        <div class="blog-content">
    
                            <div class="blog-meta">
                                <p class="blog-category">${categoryNamesList}</p>
    
                                <span class="dot"></span>
    
                                <time datetime="${formattedDate}">${formattedDate}</time>
                            </div>
    
                            <h3 class="h3 blog-item-title">${postSpec.title || '无标题文章'}</h3>
    
                            <p class="blog-text">
                                ${postSpec.excerpt.raw || ''}
                            </p>
    
                        </div>
                    </a>
                `;
                postsContainer.appendChild(postDiv);
            });
        } else {
            postsContainer.innerHTML = '没有找到符合条件的文章。';
        }
    }
    console.log('DOM 内容已加载');
});

