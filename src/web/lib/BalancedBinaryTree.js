/**
 * @name 平衡二叉树
 */

/*接口*/

/**
 * @name 平衡二叉树
 * @type Class
 */
const BalancedBinaryTree=class
{
/*构造*/

    /**
     * @name 构造方法
     * @type Constructor Function
     * @see BalancedBinaryTree
     */
    constructor()
    {
        this.root=null;
        this.nodeNumber=0;
    }

/*成员*/

    /**
     * @name 节点 
     * @type Function
     * @see BalancedBinaryTree
     * @param {Number} key 键
     * @param {Any} value 值
     * @param {Object} parent 父节点
     * @return {Object} 节点
     */
    Node(key,value,parent)
    {
        let node={};

        node.key=key;
        node.value=[];
        node.parent=parent;
        node.height=1;
        node.leftNode=null;
        node.rightNode=null;

        node.value.push(value);

        return node;
    }
    /**
     * @name 创建根节点
     * @type Function
     * @see BalancedBinaryTree
     * @param {Number} key 键
     * @param {Any} value 值
     */
    createRoot(key,value)
    {
        if(this.root===null)
        {
            this.root=this.Node(key,value,null);
            this.nodeNumber=1;
        }
    }
    /**
     * @name 计算节点高度
     * @type Function
     * @see BalancedBinaryTree
     * @param {Object} node 节点
     * @return {Number} 节点高度
     */
    calcNodeHeight(node)
    {
        let leftNodeHeight=node.leftNode ? node.leftNode.height : 0;
        let rightNodeHeight=node.rightNode ? node.rightNode.height :0;
        node.height=Math.max(leftNodeHeight,rightNodeHeight)+1;
    }
    /**
     * @name 获取平衡因子
     * @type Function
     * @see BalancedBinaryTree
     * @param {Object} node 节点
     * @return {Boolean} 平衡因子
     */
    getBalanceFactor(node)
    {
        if(node===null)
            return 0;
        else
        {
            let leftNodeHeight=node.leftNode ? node.leftNode.height : 0;
            let rightNodeHeight=node.rightNode ? node.rightNode.height :0;
        
            return leftNodeHeight-rightNodeHeight;
        }
    }
    /**
     * @name 计算树高度
     * @type Function
     * @see BalancedBinaryTree
     * @description 从触发节点向上重新计算树高度，若不平衡则旋转
     * @param {Object} activeNode 触发节点 
     * @return {Number} 树高度
     */
    calcTreeHeight(activeNode)
    {
        let current=activeNode.parent;
        while(current!==null)
        {
            let balanceFactor=this.getBalanceFactor(current);
            
            if(Math.abs(balanceFactor<=1 && balanceFactor >=-1))
                this.calcNodeHeight(current);
            else
            {
                let originParent=current.parent;
                let temp;
                if(balanceFactor<-1)
                {
                    let rightNodeBalanceFactor=this.getBalanceFactor(current.rightNode);
                    if(rightNodeBalanceFactor<0)
                        temp=this.rotateRR(current);
                    else if(rightNodeBalanceFactor>0)
                        temp=this.rotateRL(current);
                }
                else if(balanceFactor>1)
                {
                    let leftNodeBalanceFactor=this.getBalanceFactor(current.leftNode);
                    if(leftNodeBalanceFactor>0)
                        temp=this.rotateLL(current);
                    else if(leftNodeBalanceFactor<0)
                        temp=this.rotateLR(current);
                }

                if(originParent)
                {
                    if(originParent.leftNode===current)
                        originParent.leftNode=temp;
                    else if(originParent.rightNode===current)
                        originParent.rightNode=temp;
                    temp.parent=originParent;
                }
                else
                    this.root=temp;

                current=temp;
            }

            current=current.parent;
        }
    }
    /**
     * @name 右旋转
     * @type Function
     * @see BalancedBinaryTree
     * @description 对应左左情况
     */
    rotateLL(node)
    {
        let temp=node.leftNode;
        temp.parent=null;       //暂时使temp成为孤立节点树

        node.leftNode=temp.rightNode;
        temp.rightNode && (temp.rightNode.parent=node);
        
        temp.rightNode=node;
        node.parent=temp;

        this.calcNodeHeight(node);
        this.calcNodeHeight(temp);

        return temp;
    }
    /**
     * @name 左旋转
     * @type Function
     * @see BalancedBinaryTree
     * @description 对应右右情况
     */
    rotateRR(node)
    {
        let temp=node.rightNode;
        temp.parent=null;

        node.rightNode=temp.leftNode;
        temp.leftNode && (temp.leftNode.parent=node);

        temp.leftNode=node;
        node.parent=temp;

        this.calcNodeHeight(node);
        this.calcNodeHeight(temp);

        return temp;
    }
    /**
     * @name 右左旋转
     * @type Function
     * @see BalancedBinaryTree
     * @description 对应左右情况
     */
    rotateLR(node)
    {
        node.leftNode=this.rotateRR(node.leftNode);

        return this.rotateLL(node);
    }
    /**
     * @name 左右旋转
     * @type Function
     * @see BalancedBinaryTree
     * @description 对应右左情况
     */
    rotateRL(node)
    {
        node.rightNode=this.rotateLL(node.rightNode);

        return this.rotateRR(node);
    }

/*接口*/

    /**
     * @name 插入
     * @type Function
     * @see BalancedBinaryTree
     */
    insert(key,value)
    {
        let newNode;

        if(this.root===null)
            this.createRoot(key,value);
        else
        {
            let current=this.root;

            while(current!==null)
            {
                if(key<current.key)     //加入左子树
                {
                    if(current.leftNode===null)
                    {
                        newNode=this.Node(key,value,current);
                        current.leftNode=newNode;
                        this.nodeNumber++;
                        
                        current=null;
                    }
                    else
                        current=current.leftNode;
                }
                else if(key>current.key)        //加入右子树
                {
                    if(current.rightNode===null)
                    {
                        newNode=this.Node(key,value,current);
                        current.rightNode=newNode;
                        this.nodeNumber++;

                        current=null;
                    }
                    else
                        current=current.rightNode;
                }
                else        //添加值
                {   
                    if(current.value.indexOf(value)===-1)       //去重
                        current.value.push(value);

                    current=null;
                }
            }
        }

        newNode && this.calcTreeHeight(newNode);        //计算是否平衡

        return newNode;
    }
    /**
     * @name 搜索
     * @type Function
     * @see BalancedBinaryTree
     * @param {Number} key 键
     * @return {Object} 节点
     */
    search(key)
    {
        let current=this.root;

        while(current!==null)
        {
            if(current.key===key)
                return current;
            else if(key<current.key)
                current=current.leftNode;
            else if(key>current.key)
                current=current.rightNode;
        }

        return null;
    }
};

/*构造*/

export default BalancedBinaryTree;