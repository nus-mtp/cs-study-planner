import React from 'react'

export default class Nestable extends React.Component{
  render(){
    var items = this.props.items;

    return(
      <div className="dd" id="nestable">
        <OrderedList items={items}/>
      </div>
    );
  }
}

class Item extends Nestable{
  render(){
    return(
      <li className="dd-item" >
        <div className="dd-handle" style={styles.item}>{this.props.itemName}</div>
      </li>
    );
  }
}

class ListItem extends Nestable{
  constructor(){
    super();
    this.state = {
      isCollapsed: true
    }
  }

  toggleCollapse() {
      this.setState({isCollapsed: !this.state.isCollapsed});
  }
  render(){
    var isCollapsed = this.state.isCollapsed;
    var listName = this.props.listName;

    return(
      <li className="dd-item">
        <div  className="dd-handle" style={styles.list}
              onClick={this.toggleCollapse.bind(this)}>
          <i  className={"fa fa-"+ (isCollapsed ? "plus" : "minus")}
              style={styles.collapseIcon}>
          </i>
          {listName}
        </div>
        <OrderedList items={this.props.items} isCollapsed={isCollapsed}/>
      </li>
    );
  }
}

class OrderedList extends Nestable{
  render(){
    var items = this.props.items;
    var isCollapsed = this.props.isCollapsed;

    if(items){
        return(
          <ol className="dd-list" style={{display: isCollapsed ? "none" : "" }}>
            {
              items.map((item, index) => {
              if(item.children == null){
                //item is a single entry 
                return <Item itemName={item.name} key={index}/>;
              }
              else {
                //item is a list
                return <ListItem listName={item.name} items={item.children} key={index}/>;
              }
            })
          }
          </ol>
        );
    }
    else {
      return <div></div>;
    }
  }
}

const styles = ({
  collapseIcon: {
    width: 1.3 +'em',
    fontSize: 0.7+'em'
  },
  list: {
    cursor: "pointer",
    height: "auto"
  },
  item: {
    cursor: "default",
    height: "auto"
  }
});
