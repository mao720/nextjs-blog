---
title: '安卓 minSdkVersion、targetSdkVersion、compileSdkVersion 怎么配置？'
date: '2021-03-18'
---

#### 1. minSdkVersion：应用最低支持的 sdk 版本。如果手机系统低于此版本，则应用不能安装到该手机上。
#### 2. targetSdkVersion：你的代码最高适配的版本，给手机系统看的 sdk 版本。
a. 对于高版本废弃的 api：如果你的 target 版本该 api 还没有移除，系统为了兼容，就会让你继续使用。
  + 比如 23 移除的 HttpClient，你的 target 是 22，就能继续使用。
  + 如果你的 target 是 23 及以上，手机系统认为你已经适配 23 版本了，不会再出现 HttpClient 相关的代码，如果出现了就会直接抛异常说找不到这个类。

b. 对于高版本新增的 api：如果你的 target 版本该 api 还没有新增，系统为了兼容，不会执行相关 api 的代码。
  + 比如 23 新增的权限动态申请，你的 target 是 22，说明你还没适配动态权限，系统就不强求你了，所有行为都跟低版本一致，也就是不用动态申请权限。
  + 如果你的 target 是 23 及以上，手机系统认为你已经适配 23 版本了，已经写好了权限动态申请的代码。如果你不申请敏感权限就直接使用功能，就会直接抛异常说没有权限，即使你在 manifest 写了相关权限。

c. 一句话总结 targetSdkVersion：告诉系统你的应用是基于哪个 sdk 版本，请系统做好判断，不要把高 sdk 版本的功能特性用在我的应用上，也不要因为高的 sdk 版本不再支持某个功能，而不让我继续用。
#### 3. complieSdkVersion：给 gradle 编译使用的 sdk 版本。如果你写了该 sdk 没有的新版本 api，编译就不会通过。
a. 比如 MediaMetadataRetriever 类，用来从媒体文件中取出元数据，可以取出视频的第一帧用来展示。该类在 sdk 29 版本新增了 close 方法用来释放资源。如果你想写健壮的代码，在资源使用完就 close，但是你的 sdk 还是 28 及以下的版本，编译不会通过，因为 28 及以下就没有这个 close 方法。此时为了编译通过，可以将 compileSdkVersion 升级到 29。

b. 一句话总结 compileSdkVersion：用这个 sdk 版本编译我的代码，我保证我用的 api 这个 sdk 版本里都有。
#### 4. 具体使用：
a. minSdkVersion：根据公司情况，只要注意一点，系统低于该版本的手机无法安装应用。

b. targetSdkVersion：升级到哪个版本就需要代码适配到哪个版本，如果你不适配，系统也不会帮你适配，遇到没适配的地方直接给你崩溃掉。

c. compileSdkVersion：一般大于等于 targetSdkVersion。如果大于 targetSdkVersion，一般都说明你写了新版本的 api，为了编译通过升级了版本。但是你 targetSdkVersion 没有升级，新的 api 写了也白写，因为系统适配也会忽略掉。
#### 5. 其他
a. compileSdkVersion 是给 gradle 打包用的，所以不会体现在安装包里。minSdkVersion 和 targetSdkVersion 是给手机系统看的，所以打包时会被写到 AndroidManifest 配置文件中。

b. 相关链接：[安卓开发者文档-设备兼容性](https://developer.android.com/guide/practices/compatibility#Versions)
