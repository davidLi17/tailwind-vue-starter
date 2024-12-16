<template>
	<div
		class="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
		<div class="w-full max-w-screen-xl p-6">
			<h1 class="mb-6 text-4xl text-gray-800 dark:text-gray-100">
				Flowbite + Vue 3 + Tailwind CSS 启动模板
			</h1>
			<nav
				class="bg-white border-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
				<div class="flex items-center justify-between p-4">
					<a
						href="/"
						class="text-2xl font-bold text-gray-900 dark:text-white">
						Flowbite Vue
					</a>
					<ul class="flex space-x-6">
						<li>
							<a
								href="/"
								class="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
								首页
							</a>
						</li>
						<li>
							<a
								href="/events"
								class="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
								事件（数据属性）
							</a>
						</li>
						<li>
							<a
								href="/accordion"
								class="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
								手风琴
							</a>
						</li>
						<li>
							<a
								href="/modal"
								class="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
								模态框
							</a>
						</li>
						<li>
							<a
								href="/subtitle"
								class="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
								字幕转换
							</a>
						</li>
					</ul>
					<button
						@click="toggleDarkMode"
						class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
						切换暗色模式
					</button>
				</div>
			</nav>
		</div>
		<router-view
			class="w-full max-w-screen-xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"></router-view>
	</div>
</template>

<script setup>
	import { onMounted } from "vue";

	const toggleDarkMode = () => {
		const htmlElement = document.documentElement;
		if (htmlElement.classList.contains("dark")) {
			htmlElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			htmlElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
	};

	onMounted(() => {
		if (localStorage.getItem("theme") === "dark") {
			document.documentElement.classList.add("dark");
		}
	});
</script>
