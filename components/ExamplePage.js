// 在JavaScript（以及ES6模块）中，使用花括号来导入模块的特定导出是一种常见的做法。这表示我们只想从'react'库中导入Component类，而不是导入整个库。
import React, {Component} from 'react';
// 在您的 React Native 项目中，当您需要访问一个原生模块时，可以使用 NativeModules 对象来调用该模块。
// 通常，原生模块提供了一些在纯 JavaScript 中无法实现的功能，例如访问设备传感器、文件系统或执行高性能计算。
import {Platform, NativeModules, TouchableOpacity, Text, View, StyleSheet, TextInput} from 'react-native';

// GoMobileModule是在XCode中创建的.m文件的名称
const GoMobileModule = NativeModules.GoMobileModule;

// 创建一个名为ExamplePage的React组件，它继承自Component类
export default class ExamplePage extends Component {
    // 在构造函数中，初始化state，包含一个名为inputText的状态变量，用于存储用户输入的文本。
    // super(props) 是为了确保在子类构造函数（即组件的构造函数）中可以正确地使用 this.props。
    // 调用 super(props) 会执行父类（React.Component）的构造函数，并传递 props 参数，
    // 这样可以确保组件实例的属性被正确地设置。这使得你能在构造函数以及组件的其他部分（如 render 方法）中访问和使用 this.props。
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        };
    }

    _getFromNative() {
        const rnParam = this.state.inputText;

        GoMobileModule.connTcp(rnParam, str => {
            alert(str);
        });
    }

    // 输入框TextInput的value绑定到状态变量this.state.inputText。
    // TouchableOpacity是个按钮组件。

    // 在 React 的 JSX 语法中，花括号 {} 用于在 JSX 标签内部插入 JavaScript 表达式。
    // 当你需要在 JSX 中引用 JavaScript 变量、函数或其他表达式时，你需要用花括号将它们括起来。
    // 花括号告诉 React 在这些位置执行 JavaScript，并将结果插入到 JSX 中。

    // 在 React 中并没有像 Vue.js 中那样的内置双向绑定语法，
    // 所以需要通过设置 value 属性和定义 onChange（在这里是 onChangeText）事件处理器来实现类似的效果。
    // 这种方式通常被称为“受控组件”。
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({inputText: text})}
                    value={this.state.inputText}
                    placeholder="Enter text here"
                />
                <TouchableOpacity
                    onPress={() => {
                        this._getFromNative();
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Get Values from Native</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#4E88FF',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        paddingHorizontal: 10,
    },
});
