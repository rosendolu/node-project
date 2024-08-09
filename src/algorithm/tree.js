const { TreeNode } = require('./BaseTree');

var buildTree = function (preorder, inorder) {
    if (preorder.length === 0) {
        return null;
    }
    const rootVal = preorder[0];
    const rootIndex = inorder.indexOf(rootVal);
    const root = new TreeNode(rootVal);

    root.left = buildTree(preorder.slice(1, rootIndex + 1), inorder.slice(0, rootIndex));
    root.right = buildTree(preorder.slice(rootIndex + 1), inorder.slice(rootIndex + 1));
    return root;
};
