<script setup>
	import { ref, onBeforeUnmount, onMounted } from "vue";

	const inputText = ref("");
	const outputText = ref("");
	const fileEncoding = ref("UTF-8");
	const lineBreak = ref("\\n");
	const outputHref = ref("");
	const outputFilename = ref("output.srt");
	const copyMessage = ref("复制");
	const clipboardContent = ref("");

	const clearInput = () => {
		inputText.value = "";
		outputText.value = "";
		outputHref.value = "";
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(outputText.value).then(() => {
			copyMessage.value = "复制成功";
			updateClipboardContent();
		});
	};

	const formatTime = (seconds) => {
		const pad = (num) => String(num).padStart(2, "0");
		const totalMs = Math.round(seconds * 1000);
		const hours = Math.floor(totalMs / 3600000);
		const minutes = Math.floor((totalMs % 3600000) / 60000);
		const secs = Math.floor((totalMs % 60000) / 1000);
		const ms = totalMs % 1000;
		return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${String(ms).padStart(
			3,
			"0"
		)}`;
	};

	const openFileUploader = () => {
		// Implement file upload functionality
	};

	const generateFileHref = (text, filename) => {
		const blob = new Blob([text], {
			type: "text/plain;charset=utf-8",
		});
		if (outputHref.value) {
			URL.revokeObjectURL(outputHref.value);
		}
		outputHref.value = URL.createObjectURL(blob);
		outputFilename.value = filename;
	};

	const generate = (type) => {
		try {
			if (!inputText.value.trim()) {
				alert("请输入字幕数据");
				return;
			}

			const data = JSON.parse(inputText.value);
			let generatedText, filename;

			switch (type) {
				case "srt":
					const srtLines = data.body.map((item, index) => {
						const fromTime = formatTime(item.from);
						const toTime = formatTime(item.to);
						return `${index + 1}\n${fromTime} --> ${toTime}\n${item.content}\n`;
					});

					generatedText = srtLines.join("\n").trim();
					filename = "B站字幕.srt";
					break;
				case "txt":
					const txtLines = data.body.map((item) => item.content);
					generatedText = txtLines.join("\n").trim();
					filename = "B站字幕.txt";
					break;
			}

			outputText.value = generatedText;
			generateFileHref(generatedText, filename);
		} catch (error) {
			alert("数据格式错误，请检查输入的 JSON 格式是否正确");
			console.error("转换错误:", error);
		}
	};

	const updateClipboardContent = async () => {
		try {
			const text = await navigator.clipboard.readText();
			clipboardContent.value = text;
		} catch (error) {
			console.error("读取剪贴板内容失败:", error);
		}
	};

	onMounted(() => {
		updateClipboardContent();
		document.addEventListener("copy", updateClipboardContent);
		document.addEventListener("cut", updateClipboardContent);
		document.addEventListener("paste", updateClipboardContent);
	});

	onBeforeUnmount(() => {
		if (outputHref.value) {
			URL.revokeObjectURL(outputHref.value);
		}
		document.removeEventListener("copy", updateClipboardContent);
		document.removeEventListener("cut", updateClipboardContent);
		document.removeEventListener("paste", updateClipboardContent);
	});
</script>

<template>
	<div class="max-w-6xl mx-auto p-6 min-h-screen dark:bg-gray-900">
		<div class="card">
			<h2 class="header-title">B站字幕转换</h2>

			<!-- 上传文件区域 -->
			<div class="flex flex-wrap gap-4 mb-6">
				<button
					@click="openFileUploader"
					class="btn-primary">
					上传
				</button>

				<div class="flex flex-wrap gap-4">
					<div class="flex items-center">
						<label
							for="encoding"
							class="file-label"
							>文件编码:</label
						>
						<select
							v-model="fileEncoding"
							id="encoding"
							class="select-box">
							<option>UTF-8</option>
							<option>GBK</option>
						</select>
					</div>

					<div class="flex items-center">
						<label
							for="linebreak"
							class="file-label"
							>换行符:</label
						>
						<select
							v-model="lineBreak"
							id="linebreak"
							class="select-box">
							<option>\n</option>
							<option>\r\n (Windows)</option>
						</select>
					</div>
				</div>
			</div>

			<!-- 输入文本区域 -->
			<textarea
				v-model="inputText"
				class="input-textarea"
				placeholder="请输入或上传字幕文件"></textarea>

			<!-- 操作按钮 -->
			<div class="flex flex-wrap gap-2 mb-6">
				<button
					@click="generate('srt')"
					class="btn-primary">
					生成SRT文件
				</button>
				<button
					@click="generate('txt')"
					class="btn-primary">
					生成TXT文件
				</button>
				<button
					@click="clearInput"
					class="btn-secondary">
					清空
				</button>
			</div>

			<!-- 输出文本区域 -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-white">
					等待生成的文件
				</h3>
				<div class="relative">
					<pre class="output-box">{{ outputText }}</pre>
					<button
						@click="copyToClipboard"
						class="absolute top-2 right-4 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition">
						{{ copyMessage }}
					</button>
				</div>
				<a
					v-if="outputText"
					:href="outputHref"
					:download="outputFilename"
					class="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
					保存到本地
				</a>
			</div>
			<div class="mt-6">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-white">
					剪贴板内容
				</h3>
				<div class="relative">
					<pre class="output-box">{{ clipboardContent }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>
