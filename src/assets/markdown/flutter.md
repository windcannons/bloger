# Flutter

## 查看 Flutter 版本号

```bash
flutter --version
```

## 查看 Flutter 环境

```bash
flutter doctor
```

## 查看可连接设备

```bash
flutter devices
```

## 运行在所有设备上

```bash
flutter run -d all
```

## 运行在指定设备上

```bash
flutter run -d windows
```

## 常用的快捷键

```bash
r键: 点击后热加载，也就算是重新加载吧。
R键: 热重启项目。
p键: 显示网格，这个可以很好的掌握布局情况，工作中很有用。
o键: 切换 android 和 ios 的预览模式。
q键: 退出调试预览模式。
```

## 项目安卓打包

参考链接：[Flutter Android 打包指南](https://www.jianshu.com/p/36c9de3c59ca)

### 第一步：用指令生成签名文件

terminal 执行下列命令：

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 第二步：创建 key.properties 文件

在项目的 `android` 目录下新建 `key.properties` 文件，内容为：

```properties
# 创建 KEY 时输入的密钥库密码
storePassword=123456

# 创建 KEY 时输入的密钥密码
keyPassword=123456

# 密钥名称
keyAlias=keyname

# 签名的存放路径
storeFile=D:/key.jks
```

### 第三步：配置 build.gradle

在 `android/app/build.gradle` 文件中，在 `android {` 这一行前面加入如下代码：

```gradle
def keystorePropertiesFile = rootProject.file("key.properties")

def keystoreProperties = new Properties()

keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
```

### 第四步：修改 buildTypes

将：

```gradle
buildTypes {
    release {
        // TODO: Add your own signing config for the release build.
        // Signing with the debug keys for now, so `flutter run --release` works.
        signingConfig signingConfigs.debug
    }
}
```

改为：

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

### 第五步：添加网络权限

在 `android/app/src/main/AndroidManifest.xml` 中添加：

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 第六步：生成 APK

在控制台执行：

```bash
flutter build apk
```

### 第七步：安装到手机上

```bash
flutter install
```

## 项目 iOS 打包

- 根据项目名称进行证书配置
- 项目配置：在 `ios` 文件夹中添加所有需要的依赖

```bash
cd ios
```

```bash
flutter pub get
```

- 生成 iOS 项目文件：在 `ios` 文件夹中运行

```bash
flutter build ios
```

- 运行 `ios/Runner.xcworkspace` 打开 Xcode
- 选择菜单 **Product > Archive** 进行打包

### 常见问题

- Mac 电脑环境异常时：[参考解决方案](https://blog.csdn.net/weixin_44385915/article/details/110008395)
- Flutter iOS 端 Module '...' not found（找不到插件）的问题解决：[参考解决方案](https://blog.csdn.net/llh_llh_/article/details/108272745)
