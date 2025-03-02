# flutter

查看flutter版本号

```
flutter --version
```

查看flutter环境

```
flutter doctor
```

查看可连接设备

```
flutter devices
```

运行在所有设备上

```
flutter run -d all
```

运行在指定设备上

```
flutter run -d windows
```

常用的快捷键

```
r键:点击后热加载，也就算是重新加载吧。
R键:热重启项目。
p键:显示网格，这个可以很好的掌握布局情况，工作中很有用。
o键:切换android和ios的预览模式。
q键:退出调试预览模式。
```



# 项目安卓打包

https://www.jianshu.com/p/36c9de3c59ca

### 第一步：用指令生成签名文件

terminal执行下列命令:

```
Keytool -genkey -v -keystore my-release-key,keystore -alias my-key-alias -keyalg RsA -keysize 2048 -validity 10000
```

### 第二步：在项目的android目录下新建一个key.properties文件，文件内容为：

```
#创建KEY时输入的 密钥库 密码
 
storePassword=123456
 
#创建KEY时输入的 密钥 密码
 
keyPassword=123456
 
#密钥名称
 
keyAlias=keyname
 
#签名的存放路径
 
storeFile=D:/key.jks
```

### 第三步、 在/android/app/build.gradle文件，在android {这一行前面，加入如下代码：

```
def keystorePropertiesFile = rootProject.file("key.properties")
 
def keystoreProperties = new Properties()
 
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
```

### 第四步、修改 buildTypes

```
buildTypes {
 
    release {
 
        // TODO: Add your own signing config for the release build.
 
        // Signing with the debug keys for now, so `flutter run --release` works.
 
        signingConfig signingConfigs.debug
 
    }
 
}
改为：
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

### 第五步、在android/app/src/main/AndroidManifest.xml 中添加网络权限申请

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 第五步、生成apk

```
在控制台执行 flutter build apk
```

### 第六步、安装到手机上

```
使用 flutter install 
```

# 项目ios打包

- 根据项目名称进行证书配置
- 项目配置 在ios文件夹中添加所有需要的依赖

```
cd /ios
```

```
flutter pub get
```

- 生成 iOS 项目文件 在ios文件加中运行

```
flutter build ios
```

- 运行`ios/Runner.xcworkspace`打开xcode
- 选择菜单 **Product > Archive**进行打包



- mac电脑环境异常时

https://blog.csdn.net/weixin_44385915/article/details/110008395

- Flutter ios 端 Module ‘..... ‘ not found（找不到插件）的问题解决

https://blog.csdn.net/llh_llh_/article/details/108272745
