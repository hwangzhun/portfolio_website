document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'pat_eyJraWQiOiJWTEZyYllkNUZmZnZFZU1LOW1RVlVUdm9KSVplX2VHMjhRX05BVWswX1RVIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwOi8vYmxvZy5od2FuZ3podW4uY29tIiwic3ViIjoiaHdhbmd6aHVuIiwiaWF0IjoxNzI3MTA0NDQ3LCJqdGkiOiI5MDJiNmMwYi1mMmY5LTU1MzEtYjA1YS03YTZmMzE5M2JmMGQiLCJwYXRfbmFtZSI6InBhdC1od2FuZ3podW4tb3luRmsifQ.p43Vkktylp4p5BnoxKL6DBl2x7FD4EmycDXqdXPCtgTMnkGZfsNwwGa9XTmUDmVGFD9FV_c2lmcQsL1Hmjd0_VhCM17okF0akj7vnMMQXntYuFObb0XUqFhApPbfsmUBCkFia5qJwl6jTAEwhhmCayvMm5nyJ7nCMiJotr_aFBse0JoZinXzv5_9NXiImNRX5Dxec9fFelTsBjSrLKenFm2t3snJj2X7bOolpe6G-aAZQbDuiEubAe19DYN5dMzUZ35Wt2GovKspCsRy9hi3axFIBP4GiTx5nQbzAqtiaxZeHi746uIsyRlqgnId39k6TyIxnBpLGeuaBYYQkMfEwOe40GlbJrPT1G9GOAdcfna1YiVHTQo3K6-1j5eNppeyTByU0WhN8gxS7tFuu_UdS4h9Mzn62azM_JNQ8VxhadFcE8AE3Cmo_4J1dqUQbzfg0auDOlYId-DcWgyTr_Zqm761G1574XrrZVI4mEHcLJpyv_4M6KYmxnITX0FSA0pBnlv_hwmv3XAtjS3Yx7uatA_rWigmqYHt3G5jM14epAxYjZDZ6P0NuZXZDFPaeqTU5eit3tWX3E2KxC3JFHha1E45oLaAy84elH-p0ByMkpabI5YC9uvpbK0uaxWmJaOjsU3NCK8a7-c1Enqr22wmRSND8-8wmXSMz2VvK6DBJpY'; // 替换为你的 API 密钥
    const postsApiUrl = 'https://blog.hwangzhun.com/apis/content.halo.run/v1alpha1/posts'; // 替换为你的文章 API URL
    const categoriesApiUrl = 'https://blog.hwangzhun.com/apis/content.halo.run/v1alpha1/categories'; // 替换为你的分类 API URL
    const targetUUID ='76514a40-6ef1-4ed9-b58a-e26945bde3ca'

    let categoryMapping = {}; // 用于存储 UUID 到分类名称的映射

    // 首先获取所有分类
    fetch(categoriesApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'accept': '*/*'
        }
    })
    .then(response => response.json())
    .then(data => {
        // 遍历分类数据并生成映射表
        data.items.forEach(category => {
            const categoryId = category.metadata.name; // 分类的 UUID
            const categoryName = category.spec.displayName; // 分类的名称
            categoryMapping[categoryId] = categoryName;
        });

        // 然后获取文章并渲染
        return fetch(postsApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'accept': '*/*'
            }
        });
    })
    .then(response => response.json())
    .then(postData => {
        const filteredPosts = filterPostsByCategory(postData.items); // 过滤文章
        renderPosts(filteredPosts.slice(0, 6)); // 渲染最新的 6 篇文章
    })
    .catch(error => console.error('获取数据时出错:', error));

    // 过滤出目标分类的文章
    function filterPostsByCategory(posts) {
        const targetCategoryUUID = targetUUID; // 你的目标分类 UUID
        return posts.filter(post => {
            const postCategories = post.spec.categories;
            return postCategories.includes(targetCategoryUUID);
        });
    }

    // 渲染文章到 <ul> 中
    function renderPosts(posts) {
        const postsContainer = document.getElementById('posts');

        if (posts && Array.isArray(posts)) {
            posts.forEach(post => {
                const postSpec = post.spec;
                const postStatus = post.status;
                const postItem = document.createElement('li');
                postItem.classList.add('blog-post-item');

                // 获取文章的所有分类 UUID 并映射为分类名称
                const categoryUUIDs = postSpec.categories;
                const categoryNames = categoryUUIDs.map(uuid => categoryMapping[uuid] || '未分类');
                const categoryText = categoryNames.join(' - '); // 使用 ' - ' 分隔多个分类

                // 获取当前时间并格式化为 YYYY-MM-DD
                const publishDate = new Date(postSpec.publishTime);
                const formattedDate = `${publishDate.getFullYear()}-${String(publishDate.getMonth() + 1).padStart(2, "0")}-${String(publishDate.getDate()).padStart(2, "0")}`;

                postItem.innerHTML = `
                  <a href="https://blog.hwangzhun.com${postStatus.permalink}">

                    <figure class="blog-banner-box">
                      <img src="${postSpec.cover || './assets/images/default.jpg'}" alt="${postSpec.title}" loading="lazy">
                    </figure>

                    <div class="blog-content">

                      <div class="blog-meta">
                        <p class="blog-category">${categoryText}</p>

                        <span class="dot"></span>

                        <time datetime="${formattedDate}">${formattedDate}</time>
                      </div>

                      <h3 class="h3 blog-item-title">${postSpec.title || '无标题文章'}</h3>

                      <p class="blog-text">
                        ${postSpec.excerpt.raw || '无摘要'}
                      </p>

                    </div>
                  </a>
                `;

                postsContainer.appendChild(postItem);
            });
        } else {
            postsContainer.innerHTML = '<li>没有找到符合条件的文章。</li>';
        }
    }
});
