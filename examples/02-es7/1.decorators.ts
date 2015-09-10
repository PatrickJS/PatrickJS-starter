

function readonly(component) {
  component.writable = false;
  return component;
}



@readonly
class App {

}

/*
myDecorator(App);
*/


function configMyDecorator(config) {

  function myAttachDecorator(component) {
    component.attach = config.attach;
    return component;
  }

  return myAttachDecorator;
}


@configMyDecorator({
  attach: 'something'
})
class AnotherApp {

}

/*
configMyDecorator(AnotherApp);
*/
