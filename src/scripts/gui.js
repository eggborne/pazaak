export const transitionStyles = {
  centerEaseDown: {
    off: {
      opacity: '0.1',
      transform: 'scale(1.05)'
    },
    on: {
      opacity: '1',
      transform: 'none'
    },
    duration: {
      enter: 150,
      exit: 150
    }
  },
  easeInFrom: {
    left: {
      off: {
        opacity: '0.1',
        transform: 'translateX(-15%)'
      },
      on: {
        opacity: '1',
        transform: 'none'
      },
      duration: {
        enter: '200',
        exit: '200'
      }     
    },   
    right: {
      off: {
        opacity: '0.1',
        transform: 'translateX(15%)'
      },
      on: {
        opacity: '1',
        transform: 'none'
      },
      duration: {
        enter: '200',
        exit: '200'
      }      
    }   
  }
};

export const transitionIn = (el, effectObj) => {
  if (el) {
    let removeTrans = () => {
      el.style.transition = 'none';
      el.removeEventListener('transitionend', removeTrans);
    };
    el.style[effectObj.property] = effectObj.preValue;
    el.style.opacity = 0.5;
    el.style.transition = effectObj.transition;
    requestAnimationFrame(() => {
      el.style[effectObj.property] = 'none';
      el.style.opacity = 1;
      el.addEventListener('transitionend', removeTrans);
    });    
  }
};