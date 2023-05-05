#import "GoMobileModule.h"
#import <React/RCTLog.h>
#import "Hello/Hello.h"
#import "Tcp_client/Tcp_client.h" // 确保正确导入 ConnectToTCPServer

@implementation GoMobileModule
RCT_EXPORT_MODULE();
//从go层获取数据
//RCT_EXPORT_METHOD(getNativeGo:(NSString *) rnStr :(RCTResponseSenderBlock)callback{
//  NSString *goStr=HelloGreetings(rnStr);
//  callback(@[goStr]);
//});

RCT_EXPORT_METHOD(connTcp:(NSString *) rnStr :(RCTResponseSenderBlock)callback{
  NSString *goStr=Tcp_clientConnectToTCPServer(rnStr);
  callback(@[goStr]);
});
@end
