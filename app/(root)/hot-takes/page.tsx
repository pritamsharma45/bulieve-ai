<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hot Takes - Bulieve.ai</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2563eb;
            --secondary-color: #f43f5e;
            --background-color: #f9fafb;
            --card-background: #ffffff;
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --border-color: #e5e7eb;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--background-color);
            color: var(--text-primary);
            line-height: 1.5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .header {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
        }

        .header i {
            color: var(--secondary-color);
            font-size: 2rem;
            margin-right: 1rem;
        }

        .header h1 {
            font-size: 2rem;
            font-weight: bold;
        }

        .filters {
            background: var(--card-background);
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .filter-buttons {
            display: flex;
            gap: 1rem;
        }

        .filter-btn {
            padding: 0.5rem 1rem;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 4px;
            color: var(--text-secondary);
            transition: all 0.3s ease;
        }

        .filter-btn.active {
            background: var(--primary-color);
            color: white;
        }

        .trending-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .trending-card {
            background: var(--card-background);
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border: 2px solid rgba(244,63,94,0.1);
        }

        .trending-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .trending-number {
            display: flex;
            align-items: center;
            color: var(--secondary-color);
            font-weight: bold;
        }

        .trending-number i {
            margin-right: 0.5rem;
        }

        .engagement {
            display: flex;
            align-items: center;
            color: var(--text-secondary);
            font-size: 0.875rem;
        }

        .engagement i {
            margin-right: 0.5rem;
        }

        .post-title {
            font-size: 1.125rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .post-meta {
            display: flex;
            justify-content: space-between;
            color: var(--text-secondary);
            font-size: 0.875rem;
        }

        .posts-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .post-card {
            background: var(--card-background);
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .post-card-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
        }

        .post-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .post-info img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }

        .post-stats {
            display: flex;
            gap: 1rem;
            color: var(--text-secondary);
        }

        .stat {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        @media (max-width: 768px) {
            .trending-grid {
                grid-template-columns: 1fr;
            }

            .filter-buttons {
                flex-wrap: wrap;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <i class="fas fa-fire-alt"></i>
            <h1>Hot Takes</h1>
        </header>

        <section class="filters">
            <div class="filter-buttons">
                <button class="filter-btn active" data-timeframe="24h">Last 24 Hours</button>
                <button class="filter-btn" data-timeframe="7d">This Week</button>
                <button class="filter-btn" data-timeframe="30d">This Month</button>
            </div>
        </section>

        <section class="trending-grid">
            <!-- Top 3 trending posts will be inserted here -->
        </section>

        <section class="posts-list">
            <!-- Regular posts will be inserted here -->
        </section>
    </div>

    <script>
        // Sample data structure
        const posts = [
            {
                id: 1,
                title: "Why Bitcoin Could Hit 100k by End of Year",
                author: "CryptoAnalyst",
                authorImage: "/api/placeholder/40/40",
                likes: 245,
                comments: 89,
                timeAgo: "2 hours ago",
                trending: true,
                trendingPosition: 1
            },
            // Add more sample posts here
        ];

        function createTrendingCard(post, position) {
            return `
                <div class="trending-card">
                    <div class="trending-card-header">
                        <div class="trending-number">
                            <i class="fas fa-chart-line"></i>
                            <span>#${position} Trending</span>
                        </div>
                        <div class="engagement">
                            <i class="fas fa-thumbs-up"></i>
                            <span>${post.likes}</span>
                        </div>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span>by ${post.author}</span>
                        <span>${post.comments} comments</span>
                    </div>
                </div>
            `;
        }

        function createPostCard(post) {
            return `
                <div class="post-card">
                    <div class="post-card-header">
                        <div class="post-info">
                            <img src="${post.authorImage}" alt="${post.author}">
                            <div>
                                <div class="post-title">${post.title}</div>
                                <div class="post-meta">
                                    <span>${post.author} • ${post.timeAgo}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="post-stats">
                        <div class="stat">
                            <i class="fas fa-thumbs-up"></i>
                            <span>${post.likes}</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-comment"></i>
                            <span>${post.comments}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        async function fetchPosts(timeframe) {
            // In a real application, this would be an API call
            // For now, we'll simulate an API response
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(posts);
                }, 500);
            });
        }

        async function updatePosts(timeframe) {
            const posts = await fetchPosts(timeframe);
            
            // Update trending section
            const trendingGrid = document.querySelector('.trending-grid');
            trendingGrid.innerHTML = posts
                .filter(post => post.trending)
                .slice(0, 3)
                .map((post, index) => createTrendingCard(post, index + 1))
                .join('');

            // Update regular posts
            const postsList = document.querySelector('.posts-list');
            postsList.innerHTML = posts
                .map(post => createPostCard(post))
                .join('');
        }

        // Event listeners for filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');

                // Fetch and update posts
                const timeframe = e.target.dataset.timeframe;
                await updatePosts(timeframe);
            });
        });

        // Initial load
        updatePosts('24h');
    </script>
</body>
</html>